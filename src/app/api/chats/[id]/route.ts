import { NextResponse } from 'next/server';
import dayjs from 'dayjs';
import { getChatById } from '@/lib/api/db';
import { withSessionHandler } from '@/modules/auth/server/with-session-handler';

type Params = {
  id: string;
};

export const dynamic = 'force-dynamic';

export const GET = withSessionHandler<Params>(async ({ context }): Promise<NextResponse> => {
  if (!context) {
    return NextResponse.json({ error: 'Context is not defined' }, { status: 404 });
  }

  const { id } = context.params;

  const chat = await getChatById(id, {
    messages: {
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    },
  });

  if (!chat) {
    return NextResponse.json({ error: 'Chat not found' }, { status: 404 });
  }

  const { messages = [], ...chatData } = chat;

  const normalizedChat = {
    ...chatData,
    messages: messages
      .map((message) => ({
        ...message,
        createdAt: dayjs(message.createdAt).format('DD MMM YYYY, HH:mm'),
      }))
      .sort((a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix()),
  };

  return NextResponse.json(normalizedChat);
});
