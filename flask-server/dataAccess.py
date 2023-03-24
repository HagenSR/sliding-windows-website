from psycopg2.extras import RealDictCursor
from psycopg2.pool import ThreadedConnectionPool
import json


class DataAccess:

    def __init__(self) -> None:
        credentials = ""
        with open("credentials.json") as fl:
            credentials = json.load(fl)

        self.conn_pool = ThreadedConnectionPool(1, 5, host="localhost",
                                                port=5432,
                                                user=credentials["user"],
                                                password=credentials["password"],
                                                database=credentials["database"])

    def execute_query(self, query: str, args, howMany: str):
        res = None
        exception = None
        try:
            conn = self.conn_pool.getconn()
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            cursor.execute(query, args)
            if howMany == "fetchone":
                res = cursor.fetchone()
            else:
                res = cursor.fetchall()
            conn.commit()
        except Exception as ex:
            conn.reset()
            exception = ex
        finally:
            self.conn_pool.putconn(conn)
        if exception:
            raise exception
        return res

    def check(self, file_sha_256, win_size, op_id):
        res = None
        query = "SELECT api_functions.check_for_geotiff(%s, %s, %s)"
        args = (file_sha_256, win_size, op_id)
        res = self.execute_query(query, args, "fetchone")
        return res["check_for_geotiff"] 

    def insert(self, file_bytea, hash, win_size, op_id, file_name, bounds):
        res = None
        res = self.execute_query("SELECT api_functions.insert_geotiff(%s, %s, %s, %s, %s, %s, %s, %s, %s)",
                                 (file_bytea, hash, win_size, op_id, file_name.split("/")[-1], bounds.left, bounds.bottom, bounds.right, bounds.top), "fetchone")
        return res

    def get_operations(self):
        res = self.execute_query(
            "SELECT (api_functions.get_operations()).*", (), "fetchall")
        return res

    def get_meta_data(self, met_id):
        res = None
        res = self.execute_query(
            "SELECT (api_functions.get_meta_data(%s)).*", (met_id,), "fetchone")
        res["bounding_box"] = json.loads(res["bounding_box"])
        return res

    def retrieve_tiff(self, img_id):
        res = None
        res = self.execute_query(
            "SELECT api_functions.retrieve_tiff(%s)", (img_id,), "fetchone")
        return res

    def arrayToDict(res):
        rtn = {}
        for row in res:
            rtn[row["op_id"]] = row["op_desc"]
        return rtn
