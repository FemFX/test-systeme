"use client";

import { Filter as FilterIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FC } from "react";

interface FilterProps {
  setSearchTerms: React.Dispatch<React.SetStateAction<string>>;
  setFilter: React.Dispatch<React.SetStateAction<boolean | null>>;
}

const Filter: FC<FilterProps> = ({ setSearchTerms, setFilter }) => {
  return (
    <div className="flex w-1/2 ml-auto gap-3">
      <Input
        onChange={(e) => setSearchTerms(e.target.value)}
        className="grow-0"
      />
      <Select
        onValueChange={(e) =>
          setFilter(e === "active" ? true : e === "inactive" ? false : null)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
      <Button className="px-3">
        <FilterIcon className="w-4 h-4 mr-2" />
        Filter
      </Button>
    </div>
  );
};

export default Filter;
