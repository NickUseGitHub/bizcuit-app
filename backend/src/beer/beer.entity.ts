import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Beer {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column({ type: 'varchar', nullable: true })
  brand: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  style: string;

  @Column({ type: 'varchar', nullable: true })
  hop: string;

  @Column({ type: 'varchar', nullable: true })
  yeast: string;

  @Column({ type: 'varchar', nullable: true })
  malts: string;

  @Column({ type: 'varchar', nullable: true })
  ibu: string;

  @Column({ type: 'varchar', nullable: true })
  alcohol: string;

  @Column({ type: 'varchar', nullable: true })
  blg: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  randomCount: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'timestamptz' })
  updatedAt: Date;
}
