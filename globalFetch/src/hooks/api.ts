// import useFetch from "./useFetch";

// type Res = {
//   data: any;
//   ok: boolean;
// };

// export type AddTripReq = {
//   country: string;
//   city: string;
//   start_date: string;
//   end_date: string;
//   user_name: string;
// };

// export const getTrip = async (): Promise<Res> => {
//   const fetchData = useFetch();
//   const res = await fetchData("/api/trip", "GET", undefined);

//   if (!res.ok) {
//     alert(JSON.stringify(res.data));
//     console.log(res.data);
//     return Promise.reject("failed to get trip");
//   }
//   return Promise.resolve(res);
// };

// export const addTrip = async (req: AddTripReq) => {
//   const fetchData = useFetch();
//   const res = await fetchData("/api/trip", "POST", req);

//   if (!res.ok) {
//     alert(JSON.stringify(res.data));
//     console.log(res.data);

//     return Promise.reject("failed to add trip");
//   }
//   return Promise.resolve(res);
// };

// export const deleteTrip = async (id: number) => {
//   const fetchData = useFetch();
//   const res = await fetchData("/api/trip/" + id, "DELETE", undefined);
//   if (!res.ok) {
//     alert(JSON.stringify(res.data));
//     console.log(res.data);
//     return Promise.reject("failed to delete trip");
//   }
//   return Promise.resolve(res);
// };
