import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppProviders from "@/app/AppProviders";
import AppShell from "@/app/AppShell";

const App = () => (
  <Router>
    <AppProviders>
      <AppShell />
    </AppProviders>
  </Router>
);

export default App;

