import ProfileLayout from "@/src/components/ProfileLayout";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { checkLogin } from "@/src/lib/auth";
import { Copy } from "lucide-react";
import { getSession } from "next-auth/react";
import React from "react";

export default function ReferralEnroll() {
  const inputRef = React.useRef();
  const handleCopy = async () => {
    const input = inputRef.current;
    try {
      input.focus();
      await navigator.clipboard.writeText(input.value);
      alert("Copied!");
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };
  return (
    <>
      <ProfileLayout>
        <div>
          <h1 className="text-xl font-medium mb-3">রেফারেল ইনরোল</h1>

          <div className="space-y-5">
            <div className="bg-card flex flex-col gap-2 rounded-md p-4">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  type="text"
                  value="http://localhost:3000/join?ref=45sd5sd4g5da45"
                  readOnly
                />
                <Button
                  size="sm"
                  className="bg-gradient text-white flex gap-2 items-center flex-shrink-0"
                  onClick={handleCopy}
                >
                  <Copy size={16} /> কপি করুন
                </Button>
              </div>
              <p className="dark:text-slate-400 text-sm">
                এখান থেকে রেফারেল লিংক কপি করে যেকোন শিক্ষার্থীকে এই রেফারেল
                লিংকের মাধ্যমে ইনরোল করালে 10% কমিশন।
              </p>
            </div>

            <table className="table-auto border-t border-collapse w-full rounded-md">
              <thead>
                <tr>
                  <td className="border-b py-2">শিক্ষার্থীর নাম</td>
                  <td className="border-b py-2">কোর্সের নাম</td>
                  <td className="border-b py-2">স্ট্যাটাস</td>
                  <td className="border-b py-2 text-right">পেইড অ্যামাউন্ট</td>
                </tr>
                <tr className="dark:text-slate-400">
                  <td className="border-b py-2">সাহাদাত হোসেন</td>
                  <td className="border-b py-2">
                    এইচএসসি আইসিটি ক্র্যাশ কোর্স
                  </td>
                  <td className="border-b py-2 text-green-400">Admitted</td>
                  <td className="border-b py-2 text-right text-green-400">
                    ৳1500
                  </td>
                </tr>
                <tr className="dark:text-slate-400">
                  <td className="border-b py-2">সাবিদ হোসেন</td>
                  <td className="border-b py-2">
                    এইচএসসি আইসিটি ক্র্যাশ কোর্স
                  </td>
                  <td className="border-b py-2 text-green-400">Admitted</td>
                  <td className="border-b py-2 text-right text-green-400">
                    ৳1500
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </ProfileLayout>
    </>
  );
}
export async function getServerSideProps(context) {
  return checkLogin(context);
}
