import React from "react";
import type { Token } from "../../mocks/mockTokens";

type Props = {
  readonly type: "new_pairs" | "final_stretch" | "migrated" | "status";
  readonly value: any;
  readonly row: Token;
};

// ...existing code and structure...
// This is a placeholder for further UI/logic updates to match the design system and mock data structure.
export function TokenTableCell({ type, value, row }: Readonly<Props>) {
  return (
    <div className="border-primaryStroke/50 border-b flex flex-col w-full justify-start items-center cursor-pointer relative overflow-hidden hover:bg-primaryStroke/50 group h-29 min-h-29">
      {/* Top right info blocks */}
      <div className="absolute right-4 top-4 z-10 block">
        <div className="flex flex-col gap-0.5 items-end">
          <div className="relative">
            <div
              className="absolute z-0"
              style={{ inset: "-12px -8px 1px -4px" }}
            >
              <div className="group-hover:bg-primaryStroke/50 absolute inset-0 z-10" />
              <div className="bg-backgroundSecondary absolute inset-0 z-0" />
            </div>
            <div className="relative flex flex-row gap-2 justify-end items-end z-20">
              <div className="flex flex-row h-4.5 gap-1 justify-end items-end">
                <span className="text-textTertiary text-[12px] font-medium pb-[1.6px]">
                  MC
                </span>
                <span
                  className="text-[16px] font-medium"
                  style={{ color: "rgb(82, 197, 255)" }}
                >
                  {row.marketCap ?? "$0"}
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute z-0"
              style={{ inset: "-12px -8px 1px -4px" }}
            >
              <div className="group-hover:bg-primaryStroke/50 absolute inset-0 z-10" />
              <div className="bg-backgroundSecondary absolute inset-0 z-0" />
            </div>
            <div className="relative flex flex-row gap-2 justify-start items-start z-20">
              <div className="flex flex-row h-4.5 flex-1 gap-1 justify-end items-end">
                <span className="text-textTertiary text-[12px] font-medium pb-[1.6px] flex justify-center items-center">
                  V
                </span>
                <span
                  className="text-[16px] font-medium"
                  style={{ color: "rgb(255, 255, 255)" }}
                >
                  {row.volume ?? "$0"}
                </span>
              </div>
            </div>
          </div>
          <div className="relative flex flex-row gap-2 justify-start items-start -mt-0.5">
            <div
              className="absolute z-0"
              style={{ inset: "-2px -8px -4px -4px" }}
            >
              <div className="group-hover:bg-primaryStroke/50 absolute inset-0 z-5" />
              <div className="bg-backgroundSecondary absolute inset-0 z-0" />
            </div>
            <div className="relative flex flex-row justify-end items-center h-3 gap-1 shrink-0 group/image text-nowrap z-20">
              <span className="text-textTertiary text-[11px] font-medium">
                F
              </span>
              <div className="flex flex-row gap-0.5 items-center">
                <img
                  alt="SOL"
                  loading="eager"
                  width={14}
                  height={14}
                  className="w-3.5 h-3.5"
                  src="/images/sol-fill.svg"
                  style={{ color: "transparent" }}
                />
                <span className="text-textPrimary text-[12px] font-medium">
                  {row.fee ?? "0.00"}
                </span>
              </div>
            </div>
            <div className="relative flex flex-row justify-end items-center h-3 gap-1 shrink-0 group/image text-nowrap z-20">
              <span className="text-textTertiary text-[11px] font-medium">
                TX{" "}
                <span className="text-textPrimary text-[11px] font-medium">
                  {row.txCount ?? "0"}
                </span>
              </span>
              <div className="flex flex-row flex-1 min-w-6 max-w-6 h-0.5 bg-secondaryStroke rounded-full overflow-hidden">
                <div className="h-0.75 bg-increase" style={{ width: "50%" }} />
                <div className="h-0.75 bg-decrease" style={{ width: "50%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content row - dynamic values from row */}
      <div className="flex flex-row w-full gap-3 pl-3 pr-3 sm:pr-4 pt-3 pb-0.5 justify-start items-center">
        <div className="flex flex-col items-center gap-1">
          <div className="relative w-18.5 h-18.5 justify-center items-center">
            <div className="flex bg-pump absolute -bottom-1 -right-1 p-px w-4 h-4 justify-center items-center rounded-full z-30">
              <div className="flex justify-center items-center bg-background absolute w-3.5 h-3.5 rounded-full z-30">
                <img
                  alt="Pump V1"
                  loading="eager"
                  width={10}
                  height={10}
                  src="https://axiom.trade/images/pump.svg"
                  style={{ color: "transparent", objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="bg-pump/20 absolute flex p-[1px] justify-start items-center rounded-[4px] z-20">
              <div className="bg-backgroundSecondary flex p-[2px] justify-start items-center rounded-[3px]">
                <div className="w-[68px] h-[68px] flex-shrink-0 group/image relative">
                  <div className="w-full h-full relative">
                    <div className="pointer-events-none border-textPrimary/10 border-[1px] absolute w-[68px] h-[68px] z-10 rounded-[1px]" />
                    <img
                      alt={row.name ?? "Token"}
                      loading="eager"
                      width={68}
                      height={68}
                      className="rounded-[1px] w-[68px] h-[68px] object-cover"
                      src={
                        row.image ??
                        "https://axiomtrading.sfo3.cdn.digitaloceanspaces.com/EtZw1urNg2X526V3RVjFbapGr84TizkKdLVNCKFXpump.webp"
                      }
                      style={{ color: "transparent", objectFit: "cover" }}
                    />
                    <button className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 flex items-center justify-center ">
                      <i className="ri-camera-line text-white text-[24px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-[74px] h-[74px] rounded-[4px] z-10 flex items-center justify-center">
              <div className="inline-flex items-center justify-center">
                <svg width="78" height="78" viewBox="0 0 78 78">
                  <path
                    className="text-pump opacity-40"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={1}
                    d="M 76 76 L 6 76 Q 2 76 2 72 L 2 6 Q 2 2 6 2 L 72 2 Q 76 2 76 6 L 76 72 Q 76 76 76 76"
                  />
                  <path
                    className="text-pump transition-all duration-300 ease-in-out"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={1}
                    strokeLinecap="round"
                    strokeDasharray={296}
                    strokeDashoffset={296}
                    d="M 76 76 L 6 76 Q 2 76 2 72 L 2 6 Q 2 2 6 2 L 72 2 Q 76 2 76 6 L 76 72 Q 76 76 76 76"
                  />
                </svg>
              </div>
            </div>
          </div>
          <span className="text-textTertiary text-[12px] font-medium text-center max-w-[74px]">
            <button
              type="button"
              className="text-textTertiary hover:text-primaryBlueHover transition-colors duration-[125ms] text-[12px] font-medium text-center max-w-[74px] flex items-center gap-[4px] group/copy"
            >
              <span>{row.shortName ?? "Token"}</span>
            </button>
          </span>
        </div>
        <div className="flex flex-col flex-1 h-full gap-[20px] justify-start items-start pt-[0px] pb-[12px] overflow-hidden">
          <div className="flex flex-col w-full gap-[2px] justify-start items-start min-w-0">
            <div className="flex flex-row min-h-[18px] w-full gap-[4px] justify-between items-start min-w-0">
              <div className="overflow-hidden">
                <div
                  className="justify-start items-start"
                  style={{ minWidth: 153 }}
                >
                  <div className="flex flex-row gap-[4px] justify-start items-center">
                    <div
                      className="min-w-0 whitespace-nowrap overflow-hidden truncate text-textPrimary text-[16px] font-medium tracking-[-0.02em] truncate"
                      style={{ maxWidth: "120px" }}
                    >
                      {row.name ?? "Token"}
                    </div>
                    <div className="min-w-0 flex-1 overflow-hidden">
                      <button
                        type="button"
                        className="flex flex-row gap-[4px] justify-start items-center text-textTertiary hover:text-primaryBlueHover transition-colors duration-[125ms] min-w-0 overflow-hidden"
                      >
                        <div className="min-w-0 whitespace-nowrap overflow-hidden truncate text-inherit text-[16px] sm:text-[16px] lg:text-[14px] xl:text-[16px] text-left font-medium tracking-[-0.02em] xl:truncate xl:max-w-full block">
                          {row.fullName ?? "Token Full Name"}
                        </div>
                        <i className="text-inherit ri-file-copy-fill text-[14px]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Add more dynamic content here as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}
