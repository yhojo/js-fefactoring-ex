
var Lifegame = (function() {
    var game = {};
    game.GameMap = (function() {
        var GameMap = function() {
            this.map = {};
            this.minX = this.maxX = 0;
            this.minY = this.maxY = 0;
        };
        GameMap.prototype.putCell = function(x, y) {
            var key = '' + x + ',' + y;
            this.map[key] = true;
            this.maxX = Math.max(x, this.maxX);
            this.minX = Math.min(x, this.minX);
            this.maxY = Math.max(y, this.maxY);
            this.minY = Math.min(y, this.minY);
        };
        GameMap.prototype.removeCell = function(x, y) {
            var key = '' + x + ',' + y;
            delete this.map[key];
            this.maxX = Math.max(x, this.maxX);
            this.minX = Math.min(x, this.minX);
            this.maxY = Math.max(y, this.maxY);
            this.minY = Math.min(y, this.minY);
        };
        GameMap.prototype.getCell = function(x, y) {
            var key = '' + x + ',' + y;
            return this.map[key];
        };
        GameMap.prototype.defineMap = function(ary) {
            for (var y = 0; y < ary.length; y++) {
                for (var x = 0; x < ary[y].length; x++) {
                    if (ary[y].charAt(x) == 1) {
                        this.putCell(x, y);
                    } else {
                        this.removeCell(x, y);
                    }
                }
            }
        };
        GameMap.prototype.toStringArray = function() {
            var ary=[];
            for (var y = this.minY; y <= this.maxY; y++) {
                var line = "";
                for (var x = this.minX; x <= this.maxX; x++) {
                    if (this.getCell(x, y)) {
                        line += "1";
                    } else {
                        line += "0";
                    }
                }
                ary.push(line);
            }
            return ary;
        };
        GameMap.prototype.toString = function() {
            return this.toStringArray().join('\n');
        };
        GameMap.prototype.nextMap = function() {
            var map = new GameMap();
            for (var y = this.minY; y <= this.maxY; y++) {
                for (var x = this.minX; x <= this.maxX; x++) {
                    if (this.nextLive(x, y)) {
                        map.putCell(x, y);
                    } else {
                        map.removeCell(x, y);
                    }
                }
            }
            return map;
        };
        GameMap.prototype.nextLive = function(x, y) {
            return this.judge(this.countLiveCellsAround(x, y),
                              this.getCell(x, y));
        };
        GameMap.prototype.countLiveCellsAround = function(x, y) {
            var count = 0;
            count += this.getCell(x-1, y-1) ? 1 : 0;
            count += this.getCell(x, y-1) ? 1 : 0;
            count += this.getCell(x+1, y-1) ? 1 : 0;
            count += this.getCell(x-1, y) ? 1 : 0;
            count += this.getCell(x+1, y) ? 1 : 0;
            count += this.getCell(x-1, y+1) ? 1 : 0;
            count += this.getCell(x, y+1) ? 1 : 0;
            count += this.getCell(x+1, y+1) ? 1 : 0;
            return count;
        };
        GameMap.prototype.judge = function(count, live) {
            if (live) {
                switch (count) {
                case 0: return false;
                case 1: return false;
                case 2: return true;
                case 3: return true;
                case 4: return false;
                case 5: return false;
                case 6: return false;
                case 7: return false;
                case 8: return false;
                default: throw Error('隣接するセルの数が規定外。: ' + count);
                }
            } else {
                switch (count) {
                case 0: return false;
                case 1: return false;
                case 2: return false;
                case 3: return true;
                case 4: return false;
                case 5: return false;
                case 6: return false;
                case 7: return false;
                case 8: return false;
                default: throw Error('隣接するセルの数が規定外。: ' + count);
                }
            }
            return true;
        };
        return GameMap;
    })();

    return game;
})();
