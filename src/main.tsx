import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { Link } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ul>
        <li>
          <Link
            href="graf1.html"
            isExternal
            textDecoration={"underline"}
            target="_blank"
          >
            Graf 1: Jak by se zvýšil výběr daní
          </Link>
        </li>
      </ul>
    </ChakraProvider>
  </React.StrictMode>
);
