// "use client";
// import { useRouter } from "next/router";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import axios from "axios";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import * as z from "zod";

// const formSchema = z.object({
//   title: z.string().min(1, {
//     message: "Title is required",
//   }),
// });

// const CreatePage = () => {
//   const router = useRouter();
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//     },
//   });

//   const { isSubmitting, isValid } = form.formState;

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     try {
//       const response = await axios.post("/api/courses", values);
//       router.push(`/teacher/courses/${response.data.id}`);
//     } catch {
//       toast.error("Something went wrong!");
//       console.log("error! something went wrong!!");
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
//       <div>
//         <h1 className="text-2xl">Create a new course</h1>
//         <p className="text-sm text-slate-600">
//           What would you name your course?
//         </p>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-8 mt-8"
//           >
//             <FormField
//               control={form.control}
//               name="title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Course Title</FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={isSubmitting}
//                       placeholder="e.g. Machine learning"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormDescription>
//                     What will you teach in this course?
//                   </FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <div className="flex items-center gap-x-2">
//               <Link href="/">
//                 <Button type="button" variant="ghost">
//                   Cancel
//                 </Button>
//               </Link>
//               <Button disabled={!isValid || isSubmitting} type="submit">
//                 Continue
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default CreatePage;

"use client"; // Ensure this is at the top of your component

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
//import { useRouter } from "next/router"; // Client-side only
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";

///react toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
});

const CreatePage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/courses", values);
      router.push(`/teacher/courses/${response.data.id}`);
    } catch {
      toast.error("Something went wrong!");
      console.log("error! something went wrong!!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Create a new course</h1>
        <p className="text-sm text-slate-600">
          What would you name your course?
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. Machine learning"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    What will you teach in this course?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button disabled={!isValid || isSubmitting} type="submit">
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreatePage;
//5:10:00
