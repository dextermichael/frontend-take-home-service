import DogDetail from "@/components/DogDetail";
import { getDogDetail } from "@/utils/Function";
import { redirect } from "next/navigation";

const Page = async (

    props: {
        params: any;
    }
) => {
    const { slug } =await  props.params;
    const dog = await getDogDetail(slug);
    if(!dog?.name) {
        return redirect("/dashboard");
    }
    return (
        <DogDetail dog={dog} />
    );
};

export default Page;