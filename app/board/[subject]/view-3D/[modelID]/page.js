import { apiSlug } from "@/app/bundles/Hooks/useAppAPI";
import { redirect } from "next/navigation";

export default function page({ params }) {
    redirect(`${apiSlug}/v1/source/model/${params?.modelID}?key=__drk__access_local__`)
};