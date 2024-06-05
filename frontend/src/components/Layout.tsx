import { ReactNode, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ConversationList from "./ConversationList";
import { useAppSelector } from "@/hooks/hooks";
import ProtectedRoutes from "./ProtectedRoutes";
import { socket } from "@/sockets/sockets";
import { useQueryClient } from "react-query";

const Layout = ({ children }: { children: ReactNode | ReactNode[] }) => {
  const currentPage = useAppSelector((state) => state.ui.currentPage);
  const queryClient = useQueryClient();

  useEffect(() => {
    // connect to sockets.io
    socket.connect();
  }, []);

  useEffect(() => {
    socket.on("connect_error", (err) => {
      console.log(err);
    });

    // receiving message event if the user is on other pages
    socket.on("receive message", () => {
      queryClient.invalidateQueries(["chats"]);
    });

    return () => {
      socket.off("connect_error");
    };
  }, []);

  return (
    <ProtectedRoutes type="auth">
      <div className="w-full h-full hidden md:block">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            minSize={10}
            className="overflow-hidden h-screen w-[35%] md:w-[25%] lg:w-[20%]"
          >
            <ConversationList />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            minSize={75}
            className="w-full h-full bg-gray-100 dark:bg-gray-900 overflow-hidden bg"
          >
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      {/* for mobile */}
      <div className="w-full h-full md:hidden overflow-hidden">
        {currentPage === "chats-list" || currentPage === "search" ? (
          <ConversationList />
        ) : (
          <>{children}</>
        )}
      </div>
    </ProtectedRoutes>
  );
};

export default Layout;
