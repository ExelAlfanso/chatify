// src/types/next.d.ts
import { Server as HTTPServer } from "http";
import { Socket as NetSocket } from "net";
import { Server as IOServer } from "socket.io";
import type { NextApiResponse } from "next";

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};
