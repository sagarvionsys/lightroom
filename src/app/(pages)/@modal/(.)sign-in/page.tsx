"use client";

import { useRouter } from "next/navigation";
import { Modal } from "antd";
import SignInForm from "@/app/(auth)/sign-in/page";
import { useSession } from "next-auth/react";

const SignInModal = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const isOpen = session?.user?.id;
  return (
    <Modal
      open={!isOpen}
      width={500}
      footer={null}
      onCancel={() => router.back()}
    >
      <SignInForm />
    </Modal>
  );
};

export default SignInModal;
