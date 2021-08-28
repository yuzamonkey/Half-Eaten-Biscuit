import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom"
import { FIND_JOBAD } from "../../../../../graphql/queries";
import { Loading } from "../../../../UtilityComponents/UtilityComponents";
import JobDetails from "./JobDetails";

const JobInfo = () => {
  const { id }: any = useParams();
  const jobInfoResult = useQuery(FIND_JOBAD, {
    variables: { id }
  })

  if (jobInfoResult.loading) {
    return <Loading />
  }

  if (!jobInfoResult.data) {
    return <h1>Not found. The post might not be visible, or the poster has removed this query.</h1>
  }
  const job = jobInfoResult.data.findJobAd

  return (
    <JobDetails job={job}/>

  )
}

export default JobInfo