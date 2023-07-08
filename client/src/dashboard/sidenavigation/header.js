import { JOYERIA_BOULEVARD_LOGOTYPE } from "@/utils/constants";

export default function SidenavHeader() {
  return (
    <div className="bg-white flex items-center justify-center pt-6 sticky top-0 pb-6 z-10">
      <img
        className="h-10"
        src={JOYERIA_BOULEVARD_LOGOTYPE}
        alt="Joyeria Boulevard Logotype"
      />
    </div>
  );
}
