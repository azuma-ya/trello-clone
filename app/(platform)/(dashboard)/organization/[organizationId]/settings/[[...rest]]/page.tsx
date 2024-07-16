import { OrganizationProfile } from "@clerk/nextjs";

const SettingsPage = () => {
  return (
    <div className="w-full">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: "shadow-none w-full",
            cardBox: "shadow-none border-2",
          },
        }}
      />
    </div>
  );
};

export default SettingsPage;
