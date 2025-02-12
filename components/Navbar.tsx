"use client";
import React, { useState } from "react";
import { CreateProjectDialog } from "./CreateProjectDialog";
import Link from "next/link";
import { Link2, LinkIcon } from "lucide-react";
import { AppContext } from "@/context/AppContext";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { usePathname, useRouter } from "next/navigation";

function Navbar() {
  const { allProjects, setallProjects, selectedProject, setselectedProject } =
    React.useContext(AppContext);

  const pathName = usePathname();

  const router = useRouter();
  const postData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: "66a7daa1a659e92f83cdc852",
          testAmount: 10,
          isPreview: true,
        }),
      });

      const result = await response.json();

      console.log(result);

      if (result.success) {
        router.push("/checkoutPage");
      }

      console.log("Server response:", result);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  if (pathName == "/dashboard") {
    return (
      <div className="p-3 justify-between flex items-center border-b-2 sticky bg-white top-0">
        <div className=" flex items-center space-x-3">
          <Link href={"/"}>
            <h1 className="text-2xl font-bold text-blue-500 w-fit">stripeme</h1>
          </Link>
          <CreateProjectDialog />
        </div>
        {/* 
        <div>
          <Link
            target="_blank"
            href={`/checkoutPayment?clientId=${
              selectedProject?._id
            }&isPreview=true&amount=${convertToSubcurrency(49.99).toString()}`}
          >
            <LinkIcon />
          </Link>
        </div> */}

        {selectedProject && (
          <div onClick={postData}>
            <LinkIcon />
          </div>
        )}
      </div>
    );
  }
}

export default Navbar;
