import db from "../models";

const { Auction, Op } = db;

export const create = async ({ productUuid, userUuid, bidPrice }) => {
  const result = await Auction.create({ productUuid, userUuid, bidPrice });

  return result;
};

export const findTopPriceOne = async ( productUuid ) => {
  const auction = await Auction.findAll({ where: { productUuid }, order: [ [ 'bidPrice', 'DESC' ] ], limit: 1 });

  return auction[0];
};

// export const findOneByWhere = async ( where ) => {
//   const query = {};
//   Object.keys( where ).forEach( key => {
//     if ( where[key]) {
//       query[key] = where[key];
//     }
//   });
//   const auction = await Auction.findOne({ where: query });

//   return auction;
// };
