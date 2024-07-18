import ActivityItem from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    return redirect("/select-org");
  }

  const auditLogs = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <ol className="mt-4 space-y-4">
      <p className="hidden text-center text-xs text-muted-foreground last:block">
        No activity found inside this organization
      </p>
      {auditLogs.map((data) => (
        <ActivityItem key={data.id} data={data} />
      ))}
    </ol>
  );
};
ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="mt-4 space-y-4">
      <Skeleton className="h-14 w-4/5" />
      <Skeleton className="h-14 w-1/2" />
      <Skeleton className="h-14 w-[70%]" />
      <Skeleton className="h-14 w-4/5" />
      <Skeleton className="h-14 w-3/4" />
    </ol>
  );
};

export default ActivityList;
