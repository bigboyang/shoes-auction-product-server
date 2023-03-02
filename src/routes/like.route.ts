import { Router, Request, Response } from 'express';
// import { Joi, Segments, celebrate } from 'celebrate';
import ErrorException from '../exceptions/form.exception';
import { badData, badRequest } from '../exceptions/definition.exception';
import { resSuccess, responseWrapper } from '../utils/handler';
import { LikeService } from '../services';


const router = Router();

/**
 * @api {post} / like 좋아요 등록/해재
 * @param  {string} productUuid : 상품 uuid
 * @param  {string} userUuid : 사용자 uuid
 * @returns {boolean} doLike : true(좋아요), false(좋아요 해재)
*/
router.post( '/like', responseWrapper( async ( req: Request, res: Response ) => {
  const { useruuid: userUuid } = req.headers;
  const { productUuid } = req.body;

  // 좋아요 여부확인
  const isLike = await LikeService.isLike({ productUuid, userUuid });
  
  // 좋아요 여부에 따른 좋아요 등록/해재
  // ! doLike는 좋아요를 한다는 의미인데, 좋아요 해제도 시키는 건 doLike의 의미에 맞아 보이지 않음!
  // ! 차라리 route 단에서 isLike를 체크해서 함수 실행을 분기시키는 게 어떨가 싶음!
  // ! 그러면 isLike를 줄줄이 보낼 필요 없으니까 매개변수도 줄어들고!
  // ! 내가 알기로는 flag변수(isLike) 체크 같은 분기가 일어나는 지점은 최대한 앞으로 당기고
  // ! 마지막 실행함수는 최소한의 기능만을 하는 게 좋다고 알고 있음! (테스트코드 작성 관점에서?)
  
  // ! 아 그리고 좋아요를 할지, 좋아요 제거를 할지의 명확한 값을 프론트에서 받는 게 나는 맞아 보임!
  
  // ! 근데 이것도 역시 내가 말한 거 따를 필요 없음. 너의 확실한 생각만 있다면, 너 마음대로 해도 됨!
  // ! 의지가 굳은 사람은 세상을 자기에게 맞춘다 - 요한 볼프강 폰 괴테 -
  const dolike = await LikeService.doLike({ productUuid, userUuid, isLike });

  resSuccess( res, { dolike });
}) );


export default router;
