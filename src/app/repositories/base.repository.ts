import {
    Model,
    ModelStatic,
    WhereOptions,
    FindOptions,
    InferAttributes,
    Attributes,
    CreationAttributes,
    Transaction,
    OrderItem
  } from 'sequelize';
  
  import db from '../../database';
  
  type PaginationOptions<T extends Model> = {
    page?: number;
    limit?: number;
    sort?: string | string[];
    include?: FindOptions<InferAttributes<T>>['include'];
    transaction?: Transaction;
  };
  
  export abstract class BaseRepository<T extends Model> {
    constructor(protected model: ModelStatic<T>) {}
  
    async create(data: CreationAttributes<T>, options: FindOptions = {}) {
      return await this.model.create(data, options);
    }
  
    async findOne(where: WhereOptions<T>, options: FindOptions = {}) {
      return await this.model.findOne({ where, ...options });
    }
  
    async findById(id: string | number, options: FindOptions = {}) {
      return await this.model.findByPk(id, options);
    }
  
    async findMany(where: WhereOptions<T>, options: PaginationOptions<T> = {}) {
      const { page = 1, limit = 25, sort, include, transaction } = options;
      const offset = (page - 1) * limit;
      const order = this.normalizeSort(sort);
  
      return await this.model.findAll({
        where,
        limit,
        offset,
        order,
        include,
        transaction
      });
    }
  
    async findAndCount(where: WhereOptions<T>, options: PaginationOptions<T> = {}) {
      const { page = 1, limit = 25, sort, include, transaction } = options;
      const offset = (page - 1) * limit;
      const order = this.normalizeSort(sort);
  
      return await this.model.findAndCountAll({
        where,
        limit,
        offset,
        order,
        include,
        transaction
      });
    }
  
    async update(where: WhereOptions<T>, updates: Partial<Attributes<T>>, options: FindOptions = {}) {
      return await this.model.update(updates, { where, ...options, returning: true });
    }
  
    async delete(where: WhereOptions<T>, options: FindOptions = {}) {
      return await this.model.destroy({ where, ...options });
    }
  
    async exists(where: WhereOptions<T>) {
      const count = await this.model.count({ where });
      return count > 0;
    }
  
    async transaction<U>(callback: (tx: Transaction) => Promise<U>) {
      return db.transaction(callback);
    }
  
    normalizeSort(sort?: string | string[]): OrderItem[] | undefined {
        if (!sort) return undefined;
      
        const entries = Array.isArray(sort) ? sort : [sort];
      
        return entries.map<OrderItem>((entry) => {
          const column = entry.startsWith('-') ? entry.slice(1) : entry;
          const direction = entry.startsWith('-') ? 'DESC' : 'ASC';
          return [column, direction];
        });
      }
  }