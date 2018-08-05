	import Watchlist from '../../../src/renderer/components/authenticated-views/dashboard-components/WatchList';
	import Vue from 'vue';

	describe('Watchlist', () => {
		it('has a created hook', () => {
			expect(typeof(Watchlist.created)).should.equals('function');
		});

		it('sets the correct default data', () => {
    		expect(typeof(Watchlist.data)).should.equals('function');
    		const defaultData = Watchlist.data();
    		expect(typeof defaultData.Symbols).to.be.a('array');
  		});
	});