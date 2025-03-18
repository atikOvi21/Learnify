import { Category , Course } from "@prisma/client";
import { AllCourseCard } from "./all-course-card";


interface CoursesListProps {
    items: Course[];
}

export const AllCoursesList = ({ items }: CoursesListProps) => {
    return (
        <div>
         <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
           {items.map((item) => (
         <AllCourseCard
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            price={item.price!}
            />
        ))}
        </div>
        {items.length === 0 && (
            <div className="text-center text-sm text-muted-foreground mt-10">
                No courses found
                </div>)}
        </div>
    )
}