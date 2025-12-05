# Firebase Setup for Notifications

This guide will help you configure Firebase Cloud Messaging for the notification feature.

## Prerequisites

1. A Firebase project (create one at https://console.firebase.google.com/)
2. Firebase Cloud Messaging enabled

## Installation

```bash
npm install firebase
```

## Configuration

### 1. Get Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings (gear icon) → General
4. Scroll down to "Your apps" section
5. If you haven't added a web app, click "Add app" and select the web platform (</>) icon
6. Copy your Firebase configuration

### 2. Set Up Environment Variables

Create or update your `.env` file:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_VAPID_KEY=your-vapid-key
```

### 3. Get VAPID Key

1. In Firebase Console, go to Project Settings → Cloud Messaging
2. Scroll to "Web configuration"
3. Under "Web Push certificates", generate a new key pair or copy existing key
4. Add the key to your `.env` file as `VITE_FIREBASE_VAPID_KEY`

### 4. Enable Firebase Utilities

Edit `src/utils/firebase.ts`:

1. Uncomment all the commented code blocks
2. Ensure Firebase is properly initialized

### 5. Initialize Firebase in Your App

In your main `App.tsx` or `main.tsx`, add:

```typescript
import { initializeFirebase } from './utils/firebase';

// Call this when your app starts
initializeFirebase();
```

## Backend Requirements

Your backend needs to:

1. **Store FCM Tokens**: When users log in, request and store their FCM token
2. **Send Notifications**: When a notification is created via the admin panel, the backend should:
   - Receive the notification data and selected user IDs
   - Look up FCM tokens for those users
   - Use Firebase Admin SDK to send push notifications

### Example Backend Endpoint

```typescript
// Example using Firebase Admin SDK (Node.js)
import admin from 'firebase-admin';

app.post('/admin/notifications', async (req, res) => {
  const { title, message, type, userIds } = req.body;
  
  // Get FCM tokens for the selected users
  const users = await db.users.findMany({
    where: { id: { in: userIds } },
    select: { fcmToken: true }
  });
  
  const tokens = users.map(u => u.fcmToken).filter(Boolean);
  
  // Send notification via Firebase Admin SDK
  if (tokens.length > 0) {
    await admin.messaging().sendMulticast({
      tokens,
      notification: {
        title: title || 'New Notification',
        body: message,
      },
      data: {
        type: type || 'general',
      }
    });
  }
  
  // Save to database...
  res.json({ success: true });
});
```

## Service Worker (Required for Background Notifications)

Create `public/firebase-messaging-sw.js`:

```javascript
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
```

## Testing

1. **Start your development server**: `npm run dev`
2. **Navigate to**: `/admins/settings/notifications`
3. **Create a notification**:
   - Fill in title and message
   - Select users
   - Submit
4. **Check**:
   - Browser console for Firebase initialization
   - Network tab for API calls
   - Firebase Console for delivery logs

## Troubleshooting

### Notifications not appearing?

- Check browser permission (should be "Allow")
- Verify FCM tokens are being stored in database
- Check Firebase Console → Cloud Messaging → Dashboard for delivery stats
- Ensure service worker is registered properly

### Permission denied?

- Clear browser data and request permission again
- Check browser settings to ensure notifications are enabled

### Console errors?

- Verify all environment variables are set correctly
- Check that Firebase project ID matches
- Ensure Cloud Messaging is enabled in Firebase Console

## Security Notes

- Never commit `.env` file to version control
- Add `.env` to your `.gitignore`
- Use different Firebase projects for development and production
- Implement proper backend validation for notification creation

## Additional Resources

- [Firebase Cloud Messaging Documentation](https://firebase.google.com/docs/cloud-messaging)
- [Firebase Admin SDK for Node.js](https://firebase.google.com/docs/admin/setup)
- [Web Push Notifications Guide](https://firebase.google.com/docs/cloud-messaging/js/client)
