import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import React from "react";
  
  const SecurityTab = () => {
    return (
        <div className="pb-8">
      <Card className="max-w-screen-sm me-auto border-0 shadow-none">
        <CardHeader>
          <CardTitle>Security Preferences</CardTitle>
          <CardDescription>
            Your privacy and security are our priority. You can delete your
            account here. Deleting your account will remove all your data from
            Coach Corner permanently.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <button
            type="button"
            className="btn btn--primary"
          >
            Delete My Account
          </button>
        </CardContent>
      </Card>
      </div>
    );
  };
  
  export default SecurityTab;
  