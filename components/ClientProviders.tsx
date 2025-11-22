"use client";

import ApolloWrapper from "@/common/apollo/wrapper";
import Providers from "@/common/redux/providers";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloWrapper>
      <Providers>{children}</Providers>
    </ApolloWrapper>
  );
}
