import { ReactNode, useCallback, useMemo } from "react";
import BaseCountdown, { CountdownRenderProps } from "react-countdown";

import { WithOptionalClassName } from "../utils/types";

interface Props extends WithOptionalClassName {
  date: Date | number;
  whenCompleted?: ReactNode;
}

export function Countdown({ date, whenCompleted, className }: Props) {
  function appendZero(data: number) {
    if (data <= 9 && data >= 0) return `0${data}`;
    return data;
  }

  const renderer = useCallback(
    ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
      if (completed) {
        return <>{whenCompleted}</>;
      } else {
        return (
          <div className="flex flex-1 justify-center space-x-6">
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-lg bg-pink-600 py-4 px-6 text-3xl text-white text-center w-[100px]">
                {appendZero(days)}
              </div>
              <span className="text-pink-600 mt-1">Days</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-lg bg-pink-600 py-4 px-6 text-3xl text-white text-center w-[100px]">
                {appendZero(hours)}
              </div>
              <span className="text-pink-600 mt-1">Hours</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-lg bg-pink-600 py-4 px-6 text-3xl text-white text-center w-[100px]">
                {appendZero(minutes)}
              </div>
              <span className="text-pink-600 mt-1">Minutes</span>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="rounded-lg bg-pink-600 py-4 px-6 text-3xl text-white text-center w-[100px]">
                {appendZero(seconds)}
              </div>
              <span className="text-pink-600 mt-1">Seconds</span>
            </div>
          </div>
        );
      }
    },
    []
  );

  const countdown = useMemo(
    () => (
      <div className={className}>
        <BaseCountdown
          date={date}
          renderer={renderer}
          zeroPadTime={2}
          zeroPadDays={2}
        />
      </div>
    ),
    [date, className, renderer]
  );

  return countdown;
}
