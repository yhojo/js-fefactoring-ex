
describe('ボードにセルを置く', function() {
    it('Lifegameにアクセスする',function() {
        expect(Lifegame).not.toBe(null);
        new Lifegame.GameMap();
    });
    it('取りあえず、おいてみる', function() {
        var map = new Lifegame.GameMap();
        map.putCell(0,0);
        expect(map.getCell(0,0)).toBeTruthy();
    });
    it('置いたセルによって盤面が拡大する', function() {
        var map = new Lifegame.GameMap();
        map.putCell(0,0);
        expect(map.minX).toBe(0);
        expect(map.maxX).toBe(0);
        expect(map.minY).toBe(0);
        expect(map.maxY).toBe(0);
        map.putCell(10,0);
        expect(map.minX).toBe(0);
        expect(map.maxX).toBe(10);
        expect(map.minY).toBe(0);
        expect(map.maxY).toBe(0);
        map.putCell(-10,0);
        expect(map.minX).toBe(-10);
        expect(map.maxX).toBe(10);
        expect(map.minY).toBe(0);
        expect(map.maxY).toBe(0);
        map.putCell(-10,10);
        expect(map.minX).toBe(-10);
        expect(map.maxX).toBe(10);
        expect(map.minY).toBe(0);
        expect(map.maxY).toBe(10);
        map.putCell(-10,-10);
        expect(map.minX).toBe(-10);
        expect(map.maxX).toBe(10);
        expect(map.minY).toBe(-10);
        expect(map.maxY).toBe(10);
    });
    it('削除したセルによって盤面を拡大する', function() {
        var map = new Lifegame.GameMap();
        map.removeCell(0,0);
        expect(map.minX).toBe(0);
        expect(map.maxX).toBe(0);
        expect(map.minY).toBe(0);
        expect(map.maxY).toBe(0);
        map.removeCell(10,0);
        expect(map.minX).toBe(0);
        expect(map.maxX).toBe(10);
        expect(map.minY).toBe(0);
        expect(map.maxY).toBe(0);
        map.removeCell(-10,0);
        expect(map.minX).toBe(-10);
        expect(map.maxX).toBe(10);
        expect(map.minY).toBe(0);
        expect(map.maxY).toBe(0);
        map.removeCell(-10,10);
        expect(map.minX).toBe(-10);
        expect(map.maxX).toBe(10);
        expect(map.minY).toBe(0);
        expect(map.maxY).toBe(10);
        map.removeCell(-10,-10);
        expect(map.minX).toBe(-10);
        expect(map.maxX).toBe(10);
        expect(map.minY).toBe(-10);
        expect(map.maxY).toBe(10);
    });
});

describe('グラフィカルにマップを定義する', function() {
    it('小さなマップ', function() {
        var map = new Lifegame.GameMap();
        map.defineMap(['100',
                       '010',
                       '111']);
        expect(map.getCell(0,0)).toBeTruthy();
        expect(map.getCell(1,0)).not.toBeTruthy();
        expect(map.getCell(2,0)).not.toBeTruthy();
        expect(map.getCell(0,1)).not.toBeTruthy();
        expect(map.getCell(1,1)).toBeTruthy();
        expect(map.getCell(2,1)).not.toBeTruthy();
        expect(map.getCell(0,2)).toBeTruthy();
        expect(map.getCell(1,2)).toBeTruthy();
        expect(map.getCell(2,2)).toBeTruthy();
    });
    it('マップを出力する', function() {
        var map = new Lifegame.GameMap();
        map.defineMap(['100',
                       '010',
                       '111']);
        var ary = map.toStringArray();
	expect(ary).toEqual(['100',
			     '010',
			     '111']);
        console.log(map.toString());
    });
    it('縦横比が違うマップを定義して出力する', function() {
        var map = new Lifegame.GameMap();
        map.defineMap(['1000',
                       '0100',
                       '1110']);
	expect(map.toStringArray()).toEqual(['1000',
					     '0100',
					     '1110']);
        map = new Lifegame.GameMap();
        map.defineMap(['100',
                       '010',
                       '110',
                       '111']);
	expect(map.toStringArray()).toEqual(['100',
					     '010',
					     '110',
					     '111']);
    });
});

describe('次の状態を計算する', function() {
    it('一つ置いて、無くなるのを確認', function() {
        var map = new Lifegame.GameMap();
        map.putCell(0,0);
        expect(map.nextLive(0,0)).not.toBeTruthy();
    });
    it('三つ並べておいて、真ん中だけ生き残る', function() {
        var map = new Lifegame.GameMap();
        map.putCell(0,0);
        map.putCell(1,0);
        map.putCell(2,0);
        expect(map.nextLive(0,0)).not.toBeTruthy();
        expect(map.nextLive(1,0)).toBeTruthy();
        expect(map.nextLive(2,0)).not.toBeTruthy();
    });
    it('次世代マップを取得する', function() {
        var map = new Lifegame.GameMap();
        map.defineMap(['010',
                       '010',
                       '010']);
        var nextMap = map.nextMap();
        var ary = nextMap.toStringArray();
	expect(ary).toEqual(['000',
			     '111',
			     '000']);
    });
});
describe('周りの生きたセルを数える', function() {
    it('三つ並べておいて、セルを数える', function() {
        var map = new Lifegame.GameMap();
        map.putCell(0,0);
        map.putCell(1,0);
        map.putCell(2,0);
        expect(map.countLiveCellsAround(0,0)).toBe(1);                
        expect(map.countLiveCellsAround(1,0)).toBe(2);
        expect(map.countLiveCellsAround(2,0)).toBe(1);
    });
    it('だんだん増やして数えてみる', function() {
        var map = new Lifegame.GameMap();
        map.putCell(1,1);
        
        expect(map.countLiveCellsAround(1,1)).toBe(0);
        map.putCell(0,0);
        expect(map.countLiveCellsAround(1,1)).toBe(1);
        map.putCell(0,1);
        expect(map.countLiveCellsAround(1,1)).toBe(2);
        map.putCell(0,2);
        expect(map.countLiveCellsAround(1,1)).toBe(3);
        map.putCell(1,0);
        expect(map.countLiveCellsAround(1,1)).toBe(4);
        map.putCell(1,2);
        expect(map.countLiveCellsAround(1,1)).toBe(5);
        map.putCell(2,0);
        expect(map.countLiveCellsAround(1,1)).toBe(6);
        map.putCell(2,1);
        expect(map.countLiveCellsAround(1,1)).toBe(7);
        map.putCell(2,2);
        expect(map.countLiveCellsAround(1,1)).toBe(8);
    });
});
describe('セルの数に応じて生死判定する', function() {
    //        誕生
    it(' 死んでいるセルに隣接する生きたセルがちょうど3つあれば、次の世代が誕生する。', function() {
        var map = new Lifegame.GameMap();
        expect(map.judge(3, false)).toBe(true);
    });
    //        生存
    it(' 生きているセルに隣接する生きたセルが2つか3つならば、次の世代でも生存する。', function() {
        var map = new Lifegame.GameMap();
        expect(map.judge(2, true)).toBe(true);
        expect(map.judge(3, true)).toBe(true);
        expect(map.judge(2, false)).toBe(false);
    });
    //        過疎
    it('生きているセルに隣接する生きたセルが1つ以下ならば、過疎により死滅する。', function() {
        var map = new Lifegame.GameMap();
        expect(map.judge(0, true)).toBe(false);
        expect(map.judge(1, true)).toBe(false);
        expect(map.judge(0, false)).toBe(false);
        expect(map.judge(1, false)).toBe(false);
    });
    //        過密
    it('生きているセルに隣接する生きたセルが4つ以上ならば、過密により死滅する。', function() {
        var map = new Lifegame.GameMap();
        expect(map.judge(4, true)).toBe(false);
        expect(map.judge(5, true)).toBe(false);
        expect(map.judge(6, true)).toBe(false);
        expect(map.judge(7, true)).toBe(false);
        expect(map.judge(8, true)).toBe(false);
        expect(map.judge(4, false)).toBe(false);
        expect(map.judge(5, false)).toBe(false);
        expect(map.judge(6, false)).toBe(false);
        expect(map.judge(7, false)).toBe(false);
        expect(map.judge(8, false)).toBe(false);
    });
});
