import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { Link } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ul>
        <li>
          <Link href="graf1.html" textDecoration={"underline"} target="_blank">
            Graf 1: Jak by se zvýšil výběr daní
          </Link>
        </li>
        <li>
          <Link href="graf2.html" textDecoration={"underline"} target="_blank">
            Graf 2: O kolik miliard víc by stát vybral
          </Link>
        </li>
        <li>
          <Link href="graf3.html" textDecoration={"underline"} target="_blank">
            Graf 3: Efektivní sazba daní a odvodů: podle výše hrubé mzdy
          </Link>
        </li>
        <li>
          <Link href="graf4.html" textDecoration={"underline"} target="_blank">
            Graf 4: Efektivní sazba daní a odvodů: podle dětí a příjmu
            domácnosti
          </Link>
        </li>
        <li>
          <Link href="graf5.html" textDecoration={"underline"} target="_blank">
            Graf 5: Měsíční platba průměrného zaměstnance
          </Link>
        </li>
        <li>
          <Link href="graf6.html" textDecoration={"underline"} target="_blank">
            Graf 6: Měsíční platba podle dětí a příjmu
          </Link>
        </li>
        <li>
          <Link href="graf7.html" textDecoration={"underline"} target="_blank">
            Graf 7: Efektivní daňová kvóta (pětina zaměstnanců dle hrubé mzdy)
          </Link>
        </li>
        <li>
          <Link href="graf8.html" textDecoration={"underline"} target="_blank">
            Graf 8: Efektivní daňová kvóta (zaměstnanci podle příjmu domácnosti
            a dětí)
          </Link>
        </li>
        <li>
          <Link href="graf9.html" textDecoration={"underline"} target="_blank">
            Graf 9: Navýšení výběru daní a odvodů (pětiny zaměstnanců podle
            příjmu)
          </Link>
        </li>
        <li>
          <Link href="graf10.html" textDecoration={"underline"} target="_blank">
            Graf 10: Navýšení výběru daní a odvodů (zaměstnanci podle příjmu
            domácnosti a dětí)
          </Link>
        </li>
        <li>
          <Link href="graf11.html" textDecoration={"underline"} target="_blank">
            Graf 11: Přehled dotací
          </Link>
        </li>
      </ul>
    </ChakraProvider>
  </React.StrictMode>
);
