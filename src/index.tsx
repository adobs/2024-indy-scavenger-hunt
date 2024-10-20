import React from 'react';
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import * as ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import reportWebVitals from "./reportWebVitals"
import * as serviceWorker from "./serviceWorker"
import { MemoryGame } from "./components/MemoryGame";
import { Solved } from "./components/Solved";


const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MemoryGame />
    ),
  },
  {
    path: '/solved',
    element: (
      <Solved/>
    ),
  }
]);

root.render(
  <ChakraProvider theme={theme}>
    <RouterProvider router={router} />
  </ChakraProvider>
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

