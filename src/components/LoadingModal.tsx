import { Box, Center, Loader, Modal, useMantineTheme } from "@mantine/core";
import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";

const LoadingModal = ({
  children,
  title,
}: React.PropsWithChildren & { title: string }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  return (
    <Suspense
      fallback={
        <Modal
          opened
          centered
          size="85%"
          title={title}
          onClose={() => navigate(-1)}
          styles={{
            title: {
              fontWeight: theme.headings.fontWeight,
              fontSize: theme.headings.sizes.h3.fontSize,
            },
          }}
        >
          <Box h="70vh">
            <Center h="100%">
              <Loader />
            </Center>
          </Box>
        </Modal>
      }
    >
      {children}
    </Suspense>
  );
};
export default LoadingModal;
