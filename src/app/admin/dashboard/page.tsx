const AdminDashboardPage = () => {
  return (
    <div>
      <div className="visitor flex flex-col gap-3">
        <span className="font-semibold tracking-wider">Pengunjung</span>
        <div>
          <img
            className="w-[200px]"
            src="https://s01.flagcounter.com/count2/yk7n/bg_FFFFFF/txt_000000/border_CCCCCC/columns_2/maxflags_10/viewers_0/labels_0/pageviews_0/flags_0/percent_0/"
            alt="Flag Counter"
          />
        </div>

        <div>
          <h1 className="text-xl font-semibold mb-4">📊 Website Analytics</h1>

          <div className="w-full h-[90vh] rounded-xl overflow-hidden shadow-lg bg-white">
            <iframe
              src="https://us.posthog.com/shared/EBHh3wlXCOEaveFrmiVUOD6JY6w2zg"
              className="w-full h-full border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
