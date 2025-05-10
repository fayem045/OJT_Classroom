import { Webhook } from 'svix';
import type { WebhookRequiredHeaders } from 'svix';
import { headers } from 'next/headers';
import type { WebhookEvent } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { env } from "~/env";
import { db } from "~/server/db";
import { users, activities } from "~/server/db/schema";

async function getWebhookHeaders(req: Request): Promise<WebhookRequiredHeaders | null> {
  const svix_id = req.headers.get('svix-id');
  const svix_timestamp = req.headers.get('svix-timestamp');
  const svix_signature = req.headers.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return null;
  }

  return {
    'svix-id': svix_id,
    'svix-timestamp': svix_timestamp,
    'svix-signature': svix_signature
  };
}

export async function POST(req: Request) {
  try {
    const WEBHOOK_SECRET = env.CLERK_WEBHOOK_SECRET;
    
    if (!WEBHOOK_SECRET) {
      console.error('[Clerk Webhook] Missing CLERK_WEBHOOK_SECRET environment variable');
      return new Response('Server configuration error', {
        status: 500
      });
    }

    // Get and validate the headers
    const webhookHeaders = await getWebhookHeaders(req);
    if (!webhookHeaders) {
      console.error('[Clerk Webhook] Missing required Svix headers');
      return new Response('Missing webhook headers', {
        status: 400
      });
    }

    // Get the body
    const payload = await req.clone().json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    try {
      evt = wh.verify(body, webhookHeaders) as WebhookEvent;
    } catch (err) {
      console.error('[Clerk Webhook] Error verifying webhook:', err);
      return new Response('Invalid webhook signature', {
        status: 400
      });
    }

    // Handle the webhook
    const eventType = evt.type;
    console.log(`[Clerk Webhook] Processing event: ${eventType}`);

    if (eventType === 'user.created') {
      const { id, email_addresses, created_at } = evt.data;
      const email = email_addresses[0]?.email_address;

      if (!email) {
        console.error('[Clerk Webhook] No email address found for new user:', id);
        return new Response('Invalid user data', {
          status: 400
        });
      }

      try {
        // Start a transaction for user registration
        await db.transaction(async (tx) => {
          await tx.insert(users).values({
            clerkId: id,
            email: email,
            role: 'student', // Default role
          });          await tx.insert(activities).values({
            type: 'system',
            action: `New user registered: ${email}`,
          });
        });

        console.log('[Clerk Webhook] Successfully registered new user:', email);
      } catch (dbError) {
        console.error('[Clerk Webhook] Database error while registering user:', dbError);
        return new Response('Database error', {
          status: 500
        });
      }
    }

    return NextResponse.json({ 
      message: 'Webhook processed successfully',
      eventType
    });
  } catch (error) {
    console.error('[Clerk Webhook] Unexpected error:', error);
    return new Response('Internal server error', {
      status: 500
    });
  }
}