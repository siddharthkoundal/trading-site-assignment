"use client";

import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { TokenTableCell } from "../molecules/TokenTableCell";
import { mockTokens, Token } from "../../mocks/mockTokens";

// Table columns definition matching mockTokens and design
const columns: ColumnDef<Token>[] = [
  {
    accessorKey: "new_pairs",
    header: () => "New Pairs",
    cell: (info) => (
      <TokenTableCell
        type="new_pairs"
        value={info.getValue()}
        row={info.row.original}
      />
    ),
  },
  {
    accessorKey: "status",
    header: () => "Status",
    cell: (info) => (
      <TokenTableCell
        type={"status"}
        value={info.getValue()}
        row={info.row.original}
      />
    ),
  },
  {
    accessorKey: "migrated",
    header: () => "Migrated",
    cell: (info) => (
      <TokenTableCell
        type="migrated"
        value={info.getValue()}
        row={info.row.original}
      />
    ),
  },
  // Add more columns as needed for full UI parity
];

// Use mockTokens for data

export default function TokenTable() {
  const table = useReactTable({
    data: mockTokens,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6 w-full min-h-screen flex">
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 w-full">
        {/* Table structure unchanged, cell rendering now uses richer row data */}
        <table className="min-w-full w-full divide-y divide-zinc-200 dark:divide-zinc-700">
          <thead className="bg-zinc-50 dark:bg-zinc-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header, idx) => (
                  <th
                    key={header.id}
                    className="sticky top-0 z-30 w-1/3 bg-white border-b border-primaryStroke"
                  >
                    <div className="hidden sm:flex sticky top-0 z-30 whitespace-nowrap flex-row w-full gap-3 min-h-12 justify-end items-center pr-3 pl-1 lg:pl-3 xl:pl-3 border-b border-primaryStroke">
                      <div className="flex flex-row items-center gap-4 flex-1 justify-start">
                        <span className="text-textPrimary text-[16px] font-medium flex-1 text-left">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                      </div>
                      <div className="flex flex-row items-center gap-3">
                        <div className="hidden lg:block">
                          <div className="overflow-hidden whitespace-nowrap border-primaryStroke font-normal border flex flex-row h-7 pl-1 gap-1.5 justify-start items-center rounded-full hover:bg-primaryStroke/35 transition-colors duration-125 cursor-pointer">
                            <span className="flex text-[14px] text-textTertiary font-medium">
                              <i className="ri-flashlight-fill"></i>
                            </span>
                            <div className="flex flex-1 sm:max-w-8 min-w-0">
                              <input
                                placeholder="0.0"
                                className="text-[12px] w-full text-textPrimary placeholder:text-textTertiary font-medium outline-none bg-transparent text-left"
                                type="text"
                                value="0"
                                readOnly
                              />
                            </div>
                            <img
                              alt="SOL"
                              loading="lazy"
                              width="14"
                              height="14"
                              src="/images/sol-fill.svg"
                              style={{ color: "transparent" }}
                            />
                            <div className="border-primaryStroke border-l flex h-full pr-0.5 pl-0.5 gap-0.75 justify-center items-center cursor-pointer">
                              <span className="contents">
                                <button
                                  type="button"
                                  className="group w-5.5 h-5.5 flex flex-row gap-1 rounded-lg justify-center items-center transition-colors ease-in-out duration-125 hover:bg-primaryBlueHover/10"
                                >
                                  <span className="text-[12px] gap-1 flex flex-row justify-center items-center font-medium transition-colors ease-in-out duration-125 text-primaryBlue hover:text-primaryBlueHover">
                                    P1
                                  </span>
                                </button>
                              </span>
                              <span className="contents">
                                <button
                                  type="button"
                                  className="group w-5.5 h-5.5 flex flex-row gap-1 rounded-lg justify-center items-center transition-colors ease-in-out duration-125 hover:bg-primaryStroke/60"
                                >
                                  <span className="text-[12px] gap-1 flex flex-row justify-center items-center font-medium transition-colors ease-in-out duration-125 text-textSecondary">
                                    P2
                                  </span>
                                </button>
                              </span>
                              <span className="contents">
                                <button
                                  type="button"
                                  className="group w-5.5 h-5.5 flex flex-row gap-1 rounded-r-full rounded-l-lg justify-center items-center transition-colors ease-in-out duration-125 hover:bg-primaryStroke/60"
                                >
                                  <span className="text-[12px] gap-1 flex flex-row justify-center items-center font-medium transition-colors ease-in-out duration-125 text-textSecondary">
                                    P3
                                  </span>
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="contents">
                          <button
                            type="button"
                            className="flex flex-row p-1 w-6 h-6 justify-center items-center transition-opacity duration-150 ease-in-out cursor-pointer rounded-xl sm:rounded-lg relative hover:bg-primaryStroke/30"
                          >
                            <i className="ri-equalizer-3-line text-[16px] text-textSecondary"></i>
                          </button>
                        </span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-0 py-0 whitespace-nowrap text-sm text-zinc-900 dark:text-zinc-100"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
