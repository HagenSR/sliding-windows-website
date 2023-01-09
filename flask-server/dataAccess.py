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

    def check(self, file_sha_256, win_size, op_id):
        res = None
        try:
            conn = self.conn_pool.getconn()
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            cursor.execute("SELECT api_functions.check_for_geotiff(bytea %s, %s, %s)",
                            (file_sha_256, win_size, op_id))
            res = cursor.fetchone()[0]
        except:
            conn.reset()
        finally:
            self.conn_pool.putconn(conn)
        return res

    def insert(self, file_bytea, hash, win_size, op_id):
        res = None
        try:
            conn = self.conn_pool.getconn()
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            cursor.execute("SELECT api_functions.insert_geotiff(bytea %s, bytea %s, %s, %s)",
                           (file_bytea, hash, win_size, op_id))
            res = cursor.fetchone()
        except:
            conn.reset()
        finally:
            self.conn_pool.putconn(conn)
        return res

    def get_operations(self):
        rtn = None
        try:
            conn = self.conn_pool.getconn()
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            cursor.execute("SELECT (api_functions.get_operations()).*")
            res = cursor.fetchall()
            rtn = {}
            for row in res:
                rtn[row["op_id"]] = row["op_desc"]
            res = cursor.fetchone()
        except:
            conn.reset()
        finally:
            self.conn_pool.putconn(conn)
        return rtn

    def get_meta_data(self, met_id):
        res = None
        try:
            conn = self.conn_pool.getconn()
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            cursor.execute("SELECT api_functions.get_meta_data(%s, %s)", (met_id, 1))
            res = cursor.fetchone()
        except:
            conn.reset()
        finally:
            self.conn_pool.putconn(conn)
        return res

    def retrieve_tiff(self, img_id):
        res = None
        try:
            conn = self.conn_pool.getconn()
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            cursor.execute("SELECT api_functions.retrieve_tiff(%s)", (img_id,))
            res = cursor.fetchone()
        except:
            conn.reset()
        finally:
            self.conn_pool.putconn(conn)
        return res