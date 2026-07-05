from fastapi import APIRouter, Depends, HTTPException, status

from app.core.dependencies import get_current_user

from app.schemas.exchange_schema import (
    ExchangeRequestCreate,
    ExchangeResponse
)

from app.services.exchange_service import (
    send_exchange_request,
    get_received_requests,
    get_sent_requests,
    accept_request,
    reject_request,
    cancel_request
)

router = APIRouter(
    prefix="/exchange",
    tags=["Exchange Requests"]
)


# -------------------------------------------------------
# Helper Function
# -------------------------------------------------------

def exchange_response(request):

    return ExchangeResponse(
        id=str(request["_id"]),
        item_id=request["item_id"],
        owner_id=request["owner_id"],
        requester_id=request["requester_id"],
        message=request["message"],
        status=request["status"],
        created_at=request["created_at"]
    )


# -------------------------------------------------------
# Send Exchange Request
# -------------------------------------------------------

@router.post(
    "/request",
    response_model=ExchangeResponse,
    status_code=status.HTTP_201_CREATED
)
async def create_exchange_request(
    exchange: ExchangeRequestCreate,
    current_user=Depends(get_current_user)
):

    try:

        request = await send_exchange_request(
            exchange,
            current_user
        )

        return exchange_response(request)

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# -------------------------------------------------------
# View Received Requests
# -------------------------------------------------------

@router.get(
    "/received",
    response_model=list[ExchangeResponse]
)
async def view_received_requests(
    current_user=Depends(get_current_user)
):

    requests = await get_received_requests(current_user)

    return [
        exchange_response(request)
        for request in requests
    ]


# -------------------------------------------------------
# View Sent Requests
# -------------------------------------------------------

@router.get(
    "/sent",
    response_model=list[ExchangeResponse]
)
async def view_sent_requests(
    current_user=Depends(get_current_user)
):

    requests = await get_sent_requests(current_user)

    return [
        exchange_response(request)
        for request in requests
    ]


# -------------------------------------------------------
# Accept Exchange Request
# -------------------------------------------------------

@router.put(
    "/{request_id}/accept"
)
async def accept_exchange_request(
    request_id: str,
    current_user=Depends(get_current_user)
):

    try:

        return await accept_request(
            request_id,
            current_user
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# -------------------------------------------------------
# Reject Exchange Request
# -------------------------------------------------------

@router.put(
    "/{request_id}/reject"
)
async def reject_exchange_request(
    request_id: str,
    current_user=Depends(get_current_user)
):

    try:

        return await reject_request(
            request_id,
            current_user
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


# -------------------------------------------------------
# Cancel Exchange Request
# -------------------------------------------------------

@router.delete(
    "/{request_id}"
)
async def cancel_exchange(
    request_id: str,
    current_user=Depends(get_current_user)
):

    try:

        return await cancel_request(
            request_id,
            current_user
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )