from flask import Blueprint

from bundles.common.prototypes import RequestHandler
from controller.board import Board

board = Blueprint("board", __name__)
_common = RequestHandler()
_board = Board()


@board.route('/v1/board/physics/lens/calculate', methods=['POST'])
def calculateLensPhysics():
    return _common.handle_exception(lambda: _board.calculateLensPhysics(_common.get_json(".")))


@board.route('/v1/board/physics/swimming/calculate', methods=['POST'])
def calculateSwimmingPhysics():
    return _common.handle_exception(lambda: _board.calculateSwimmingPhysics(_common.get_json(".")))


@board.route('/v1/board/physics/vector/calculate', methods=['POST'])
def calculateVectorPhysics():
    return _common.handle_exception(lambda: _board.calculateVectorPhysics(_common.get_json(".")))


@board.route('/v1/board/physics/projectile/calculate', methods=['POST'])
def calculateProjectilePhysics():
    return _common.handle_exception(lambda: _board.calculateProjectilePhysics(_common.get_json(".")))
