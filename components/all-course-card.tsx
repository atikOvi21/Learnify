import  Link  from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/format";

interface CourseCardProps {
    id: string;
    title: string;
    imageUrl: string;
    price: number;
};

export const  AllCourseCard = ({
    id,
    title,
    imageUrl,
    price,
}: CourseCardProps) => {
    return (
        <Link href={`/courses/${id}`}>
           <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
              <div className="relative w-full aspect-video rounded-md overflow-hidden">
                  <Image
                  fill
                  className="object-cover"
                  alt={title}
                  src={imageUrl}
                  
                  />
              </div>
              <div className="flex flex-col pt-2">
                 <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                    {title}
                 </div>
                 
                    {price === 0 ? (
                        <p className="text-md md:text-sm font-medium text-slate-700">
                            Free
                        </p>
                ) : (
                    <p className="text-md md:text-sm font-medium text-slate-700">
                        {formatPrice(price)}
                    </p>    
               )}
              </div>
           </div>
        </Link>
    )
}