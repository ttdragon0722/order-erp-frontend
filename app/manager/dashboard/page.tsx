"use client"
import ManagerLogoutBtn from "@/components/logout";
import SearchInput from "@/components/Searchbar";
import { Header1, Header2 } from "@/components/ui/Text";
import useStatus from "@/hook/useLoading";
import { BusinessSetting, BusinessSettings } from "@/lib/businessSettings";
import { useEffect, useState } from "react";
import SwitchLabel from "./_components/SwitchLabel";

export default function Dashboard() {

  const { status, setStatus } = useStatus();
  const [settings, setSettings] = useState<BusinessSetting>();

  useEffect(() => {
    // 定義一個 async 函式來獲取設定資料
    const fetchSettings = async () => {
      const setting = await BusinessSettings.getAll();

      if (setting.success) {
        setStatus.success();
        setSettings(setting.data);
      } else {
        setStatus.error();
      }
    };

    fetchSettings(); // 調用 async 函式
  }, []); // 只在組件首次渲染時執行

  return (
    <>
      <Header1>Welcome to ERP Dashboard!</Header1>
      <hr className="my-2" />
      <Header2>hello world!</Header2>

      {
        status === "loading" ? <div>loading</div> :
          status === "error" ? <div>error</div> :
            status === "success" && settings && <div className="flex w-full justify-around">
              <SwitchLabel label="營業狀態" src={settings.enableOrdering} api="setEnableOrderingStatus" />
              <SwitchLabel label="外帶狀態" src={settings.enableTakeout} api="setTakeoutStatus" />
              <SwitchLabel label="內用狀態" src={settings.enableDineIn} api="setDineInStatus" />
              <SwitchLabel label="外送狀態" src={settings.enableDelivery} api="setDeliveryStatus" />
            </div>
      }

      <ManagerLogoutBtn />
      <SearchInput queryFunc={(q) => { console.log("query", q); }} />
      {
        Array.from({ length: 100 }).map((_, index) => {
          return <div key={index}>haha</div>;
        })
      }
    </>
  );
}
