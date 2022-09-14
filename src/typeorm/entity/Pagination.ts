import { Column } from "typeorm";

export class PaginationDto {
  @Column({ default: 10 })
  limit: number | string;

  @Column({ default: 0 })
  offset: number | string;
}
