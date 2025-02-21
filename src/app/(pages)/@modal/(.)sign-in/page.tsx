"use client";

import { useRouter } from "next/navigation";
import { Modal } from "antd";
import SignInForm from "@/app/(auth)/sign-in/page";

const SignInModal = () => {
  const router = useRouter();
  return (
    <Modal open={true} width={500} footer={null} onCancel={() => router.back()}>
      <SignInForm />
    </Modal>
  );
};

export default SignInModal;
