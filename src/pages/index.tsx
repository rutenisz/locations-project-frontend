import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Objects from "@/components/Objects/Objects";
import { useRouter } from "next/router";
import PageTemplate from "@/components/PageTemplate.tsx/PageTemplate";

export default function LandingPage() {
  const router = useRouter();

  const [objects, setObjects] = useState<Array<any> | null>(null);

  const fetchObjects = async () => {
    try {
      const headers = {
        authorization: Cookie.get("jwt_token"),
      };

      const response = await axios.get("http://localhost:3001/objects", {
        headers,
      });
      // console.log(response);
      setObjects(response.data.objects);
    } catch (err: any) {
      if (err.response.status === 401) {
        router.push("user-login");
      }
    }
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  return (
    <>
      <PageTemplate>
        <Objects objects={objects} />
      </PageTemplate>
    </>
  );
}
