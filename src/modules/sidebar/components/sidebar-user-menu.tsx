'use client';

import React, { FC } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useSidebarContext } from '@stn-ui/provider';
import { UserMenu } from '@stn-ui/user-menu';

export const SidebarUserMenu: FC = () => {
  const session = useSession();
  const { isExpanded } = useSidebarContext();

  if (!session.data) {
    return null;
  }

  return (
    <UserMenu isExpanded={isExpanded} email={session.data?.user?.email ?? ''} onLogOut={signOut} />
  );
};
