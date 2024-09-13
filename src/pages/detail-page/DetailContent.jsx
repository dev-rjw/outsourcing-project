import React, { useEffect } from "react";
import useKopisStore from "../../zustand/kopisStore";

const DetailContent = () => {
  const { data, fetchData } = useKopisStore((state) => ({
    data: state.data,
    fetchData: state.fetchData,
  }));
  const id = "PF132236";

  useEffect(() => {
    fetchData(id);
  }, [fetchData, id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data.prfcast && <p>출연진: {data.prfcast}</p>}
      {data.relates &&
        data.relates.relate &&
        data.relates.relate.length > 0 && (
          <div>
            <h3>관련 링크:</h3>
            {data.relates.relate.map((relate, index) => (
              <div key={index}>
                <a
                  href={relate.relateurl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {relate.relatenm}
                </a>
              </div>
            ))}
          </div>
        )}
      {data.styurls &&
        data.styurls.styurl &&
        data.styurls.styurl.length > 0 && (
          <div>
            <p>공연 설명:</p>
            {data.styurls.styurl.map((styurl, index) => (
              <img
                key={index}
                src={styurl}
                alt={`${index}`}
                style={{ maxWidth: "100%", height: "auto" }}
              />
            ))}
          </div>
        )}
    </div>
  );
};

export default DetailContent;
