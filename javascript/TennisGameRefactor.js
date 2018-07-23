var Player = function (name) {
  this.name = name;
  this.score = 0;
};

var TennisGame1 = function (player1Name, player2Name) {
  this.player1 = new Player(player1Name);
  this.player2 = new Player(player2Name);
  this.scoreLabels = ['Love', 'Fifteen', 'Thirty', 'Forty'];
};

TennisGame1.prototype.scoreFunctions = function () {
  return [
    this._getEvenScoreLabel,
    this._getOngoingScoreLabel,
    this._getWinScoreLabel,
    this._getAdvantageScoreLabel
  ];
};

TennisGame1.prototype._getEvenScoreLabel = function () {
  return {
    isMatchingGameStatus: function (player1, player2) {
      return player1.score === player2.score;
    },
    getScore: function (player1, player2, scoreLabels) {
      return player1.score <= 2 ? scoreLabels[player1.score] + '-All' : 'Deuce';
    }
  };
};

TennisGame1.prototype._getAdvantageScoreLabel = function () {
  return {
    isMatchingGameStatus: function () {
      return true;
    },
    getScore: function (player1, player2, scoreLabels) {
      return (
        'Advantage ' +
        (player1.score > player2.score ? player1.name : player2.name)
      );
    }
  };
};

TennisGame1.prototype._getWinScoreLabel = function () {
  return {
    isMatchingGameStatus: function (player1, player2) {
      return Math.abs(player1.score - player2.score) > 1;
    },
    getScore: function (player1, player2, scoreLabels) {
      return (
        'Win for ' +
        (player1.score > player2.score ? player1.name : player2.name)
      );
    }
  };
};

TennisGame1.prototype._getOngoingScoreLabel = function () {
  return {
    isMatchingGameStatus: function (player1, player2) {
      return player1.score < 4 && player2.score < 4;
    },
    getScore: function (player1, player2, scoreLabels) {
      return scoreLabels[player1.score] + '-' + scoreLabels[player2.score];
    }
  };
};

TennisGame1.prototype.getScore = function () {
  for (var scoreFunction of this.scoreFunctions()) {
    scoreFunction = scoreFunction();
    if (scoreFunction.isMatchingGameStatus(this.player1, this.player2)) {
      return scoreFunction.getScore(
        this.player1,
        this.player2,
        this.scoreLabels
      );
    }
  }
};

TennisGame1.prototype.wonPoint = function (playerName) {
  playerName === this.player1.name
    ? this.player1.score++
    : this.player2.score++;
};

if (typeof window === 'undefined') {
  module.exports = TennisGame1;
}
