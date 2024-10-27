"use client"

import { ColumnDef } from "@tanstack/react-table"


// program-batch can have multiple section
// section will belongs to one program-batch
// section can have multiple students
// student will belongs to one section

export type Student = {
  name: string // Sukhpreet Singh
  program: string // B.tech Computer Science AIML
  batch: string // 2021
  email: string,
  section: null | "A" | "B" | "C" // null
}

export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "program",
    header: "Program",
  },
  {
    accessorKey: "batch",
    header: "Batch",
  },
  {
    accessorKey: "email",
    header: "Email Address"
  },
  {
    accessorKey: "section",
    header: "Section"
  }
]
