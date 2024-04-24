import { db } from "../../db";
import { unstable_noStore as noStore } from "next/cache";

const getData = async () => {
  const data = await db.userResult.findMany();
  return data;
};

export default async function BlogPage() {
  noStore();
  const res = await getData();
  return (
    <div>
      <h1 className="text-4xl mb-5 text-black">Результати</h1>
      <div className="flex flex-col gap-8">
        {res.map((item: any, index: number) => (
          <div className="flex flex-col gap-4" key={index}>
            <h1 className="text-left text-2xl text-blue-950">
              {item.userName}
            </h1>
            <ul className=" flex flex-col">
              {item.result.map((item2: any) => {
                return (
                  <li
                    className="p-3 mb-2 rounded-xl text-black bg-orange-400 text-lg font-bold"
                    key={item2.id}
                  >
                    <p className=" flex gap-3">
                      <span> {item2.number}</span>
                      <span> {item2.title}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
