import { WithChildren } from "../utils/types";

export function Container({ children }: WithChildren) {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-white p-10 rounded-lg shadow-inner shadow-slate-400 text-black text-center min-w-1/3">
        {children}
      </div>
    </div>
  );
}
