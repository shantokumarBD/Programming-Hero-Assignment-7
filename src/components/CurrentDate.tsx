"use client";
import React, { useEffect, useState } from "react";

const CurrentDate = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      }),
    );
  }, []);

  return <>{date}</>;
};

export default CurrentDate;
