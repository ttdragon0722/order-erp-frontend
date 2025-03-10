"use client"
import ManagerLogoutBtn from "@/components/logout";
import SearchInput from "@/components/Searchbar";
import { Header1, Header2 } from "@/components/ui/Text";
import useStatus from "@/hook/useLoading";
import { BusinessSetting, BusinessSettings } from "@/lib/businessSettings";
import { useEffect, useState } from "react";
import SwitchLabel from "./_components/SwitchLabel";
import Group from "@/components/ui/Group";

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
  }, []);

  return (
    <Group>
      <Header1>後台管理系統 Dashboard</Header1>
      <hr className="my-2" />
      <Group title="快捷選單">
        {
          status === "loading" ? <div className="animate-pulse h-36 bg-gray-200 rounded-xl w-full mb-4 flex justify-center items-center">loading...</div> :
            status === "error" ? <div>error</div> :
              status === "success" && settings && <div className="flex w-full justify-around gap-3">
                <SwitchLabel label="營業狀態" src={settings.enableOrdering} api="setEnableOrderingStatus" />
                <SwitchLabel label="外帶狀態" src={settings.enableTakeout} api="setTakeoutStatus" />
                <SwitchLabel label="內用狀態" src={settings.enableDineIn} api="setDineInStatus" />
                <SwitchLabel label="外送狀態" src={settings.enableDelivery} api="setDeliveryStatus" />
              </div>
        }
      </Group>
    </Group>
  );
}
